'use strict';

import AbstractComponent from './Abstract';
import BlogNavBarComponent from './BlogNavBar';

import '../css/Body.css'
import '../css/Projects.css';

export default class ProjectsComponent extends AbstractComponent {
    mount() {
        this.mountPosId = 'main-container';
        new BlogNavBarComponent();
        super.mount();
        this.changeHeader();
    }
    getHTML() {
        return `
            <ul id="projects">
                <li id="project">
                    <div>
                        <h1>코드 채점 프로그램</h1>
                        <a href="https://github.com/mansukim1125/Judger-Java" target="_blank">프로젝트 링크</a>
                        <p>
                            교내 시험의 채점 시스템은 사용자가 직접 채점하는 방식입니다. 하지만 이는 다음과 같은 문제가 있었습니다:<br>
                            <ol>
                                <li>다양하지 않은 테스트 케이스</li>
                                <li>실행 시간 / 메모리 사용량 확인 불가</li>
                                <li>동일한 실행 환경에서 채점하지 않음</li>
                                <li>일정하지 않은 테스트 케이스</li>
                            </ol>
                            <br>
                            이러한 문제를 해결하기 위해 교내 시험을 위한 채점 서비스를 만들고자 했습니다. Java을 이용해 솔루션 코드를 제출하고 Docker Container 내부에서 채점하는 프로그램입니다.
                            이 프로그램을 학내 알고리즘 스터디 모임에서 동료들의 코드를 채점하는 데 활용하고 있습니다.
                            GUI는 Java에서 기본적으로 제공되는 Swing을 이용해 제작하였으며, Back-End는 데이터를 불러오는 로직과 Handling하는 로직, 채점을 하는 로직을 분리해 유지보수가 용이하도록 설계하였습니다. 그리고, 채점이 완료될 경우 채점 로직에서 Event를 발생시켜 Event를 Handling하는 로직을 별도로 작성해 이를 실행함으로써 채점 로직이 GUI를 직접 건드리지 않도록 하였습니다.
                        </p>
                    </div>
                </li>
                <hr>
                <li id="project">
                    <div>
                        <h1>지금 보고 계시는 블로그</h1>
                        <a href="https://github.com/mansukim1125/blog" target="_blank">프로젝트 링크</a>
                        <p>
                            Front-end Framework인 Vue.js를 사용한 경험이 있는데, Vue.js의 기능 중 SPA(Single Page Application)의 원리가 궁금해 SPA를 Vanila JavaScript로 구현한 프로젝트입니다. 현재 Netlify에 배포되어 있습니다.
                            JSON의 Tree 구조를 순회하면서 사용자가 접속한 URI에 Match되는 Component를 렌더링하는 방식입니다.
                            <br><br>
                            다음은 블로그를 어떻게 만들었는지를 기록한 글입니다.
                            <ul>
                                <li>
                                    <a href="/blog/posts/블로그 개발기 1_시작" data-link">블로그 개발기 1_시작</a>
                                </li>
                                <li>
                                    <a href="/blog/posts/블로그 개발기_2_Router 알고리즘 설계" data-link">블로그 개발기_2_Router 알고리즘 설계</a>
                                </li>
                                <li>
                                    <a href="/blog/posts/블로그 개발기_3_Router 정규표현식" data-link">블로그 개발기_3_Router 정규표현식</a>
                                </li>
                            </ul>
                            
                        </p>

                    </div>
                </li>
                <hr>
            </ul>
        `;
    }
    changeHeader() {
        document.querySelector("#posts-header > div > h1").textContent = "프로젝트";
        document.querySelector("#nav-menu > li.menu > span").textContent = "프로젝트";
    }
}
