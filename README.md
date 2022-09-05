## Commit 컨벤션

- **feat:** 새로운 기능 추가
- **fix:** 버그 픽스
- **docs:** 문서 수정
- **style:** 포맷, 세미콜론 수정, Optimize import, Code clean up 등 코드가 아닌 스타일에 관련된 수정
- **refactor:** 코드 리펙토링
- **test:** 테스트 코드 추가
- **chore:** 빌드 관련 업무 수정(안드로이드의 경우 builde.gradle, manifest)
- **design**: UI 디자인 변경 (css 등)

<aside>
💡 feat/FE : 기능 추가
feat/BE : 기능 추가

</aside>

ex) feat/FE_signup

## Branch 컨벤션

master : 기준이 되는 브랜치, 배포하는 브랜치

develop : 개발브랜치로 개발자들이 이 브랜치를 기준으로 각자 작업한 기능들 merge

feature : 단위 기능 개발 브랜치, 기능 개발완료되면 develop 브랜치로 합친다(merge)

release : 배포를 위해 master 브랜치로 보내기전에 QA(품질검사)를 위한 브랜치

hotfix : master 브랜치로 배포 했는데 버그 생겼을 떄 긴급 수정

- Master / develop이 메인 브랜치

<aside>
💡 feature/user

</aside>
