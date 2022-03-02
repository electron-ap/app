import { FC, Fragment } from "react";
import Login from "pages/noAuthor/login";
import { useAuth } from "libs/context/authorityProvider";
import Author from "pages/author";
import { ErrorBoundary } from "components/error/error-boundary";
import { fullPageErrorFallback } from "components/error/fullPageErrorFallBack";
import { useBackground } from "libs/hooks";
import { HashRouter } from "react-router-dom";
const App: FC = () => {
  const { user } = useAuth();
  useBackground("#eff3fc");
  return (
    <HashRouter>
      <ErrorBoundary fallbackRender={fullPageErrorFallback}>
        <Fragment>{user ? <Author /> : <Login />}</Fragment>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default App;
// "build": {
//     "appId": "com.electron.app",
//         "copyright": "Copyright ***",
//         "productName": "贸易链智慧",
//         "mac": {
//         "icon": "build/logo.png",
//             "category": "public.app-category.productivity",
//             "artifactName": "${productName}_${version}.${ext}",
//             "target": [
//             "dmg",
//             "zip"
//         ]
//     },
//     "win": {
//         "icon": "build/logo.png",
//             "artifactName": "${productName}_${version}.${ext}",
//             "verifyUpdateCodeSignature": false,
//             "target": [
//             {
//                 "target": "nsis",
//                 "arch": [
//                     "ia32"
//                 ]
//             }
//         ]
//     },
//     "nsis": {
//         "oneClick": false,
//             "createDesktopShortcut": "always",
//             "allowToChangeInstallationDirectory": true
//     },
//     "extends": null
// },
// "electron:build": "electron-packager . electron-app --platform=win32 --arch=x64 --icon=computer.ico --out=./out --asar --app-version=1.0.0 --overwrite --ignore=node_modules --electron-version 16.0.5"
