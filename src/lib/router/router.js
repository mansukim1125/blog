'use strict';

function startsWith(str, regex) {
    const reg = new RegExp(/^/.source + regex.source);
    return str.match(reg) ? true : false;
}

function endsWith(str, regex) {
    const reg = new RegExp(regex.source + /$/.source);
    return str.match(reg) ? true : false;
}

const regexReducer = (pathStack) => {
    return new RegExp(pathStack.join('').replace(/\/+/, '/'));
}

export default class Router {
    constructor(routes) {
        this.routes = routes;
        this.renderStack = [];
        this.nextRenderStack = [];
        this.pathStack = []; // regex reduce하기 위해.
        this.targetPath = '';
        this.currentPath = '/'
    }
    push(path) {
        path = path.replace(/\/+/, '/');
        if (path !== '/') path = path.replace(/\/$/, '');
        this.targetPath = path;
        this.pathStack = [];
        this.nextRenderStack = [];
        const traverseResult = this.traverseRoutes(this.routes);
        if (traverseResult === true) {
            this.currentPath = this.targetPath;
            this.render();
        } else if (traverseResult === undefined) {
            this.currentPath = this.currentPath;
        } else {
            this.push(traverseResult);
        }
        return this.renderStack;
    }
    render() {
        const renderStackLength = this.renderStack.length;
        const nextRenderStackLength = this.nextRenderStack.length;
        if (renderStackLength > nextRenderStackLength) {
            let i = 0; 
            while (i < renderStackLength - nextRenderStackLength) {
                this.renderStack.pop();
                ++i;
            }
        }
        let i = 0;
        for (i = 0; i < renderStackLength || i < nextRenderStackLength; ++i) {
            if (JSON.stringify(this.renderStack[i]) !== JSON.stringify(this.nextRenderStack[i])) break;
        }
        while (i < nextRenderStackLength) {
            this.renderStack[i] = this.nextRenderStack[i].param ? {
                path: this.nextRenderStack[i].path,
                component: new this.nextRenderStack[i].component(this.nextRenderStack[i].param, i > 0 ? this.renderStack[i - 1] : null),
                param: this.nextRenderStack[i].param
            } :
            {
                path: this.nextRenderStack[i].path,
                component: new this.nextRenderStack[i].component(i > 0 ? this.renderStack[i - 1] : null),
            }
            ++i;
        }
    }
    pathToRegex(pathObj) {
        let path = pathObj.path;
        if (pathObj.param) {
            if (pathObj.param.type === 'Number') {
                path = path.replace(/:\w+/, '(\\d+)');
            } else {
                path = path.replace(/:\w+/, '(.+)');
            }
        }
        return path;
    }
    traverseRoutes(routes) {
        const routesLength = routes.length;
        for (let i = 0; i < routesLength; ++i) {
            const regexStr = this.pathToRegex(routes[i]);
            this.pathStack.push(regexStr);
            const reducedRegex = regexReducer(this.pathStack);
            // match regex to url
            if (!startsWith(this.targetPath, reducedRegex)) {
                this.pathStack.pop();
                continue;
            }
            const matchResult = this.targetPath.match(reducedRegex)
            this.nextRenderStack.push(routes[i].param ?
                {
                    path: routes[i].path,
                    component: routes[i].component,
                    param: {
                        [routes[i].param.name]: routes[i].param.type === 'Number' ? +matchResult[matchResult.length - 1] : matchResult[matchResult.length - 1]
                    }
                } :
                {
                    path: routes[i].path,
                    component: routes[i].component
                }
            );
            if (endsWith(this.targetPath, reducedRegex)) {
                if (routes[i].redirect) return routes[i].redirect;
                return true;
            }
            if (routes[i].children) {
                const result = this.traverseRoutes(routes[i].children);
                if (result) return result;
            }
            this.nextRenderStack.pop();
            this.pathStack.pop();
        }
    }
}
