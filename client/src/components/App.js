import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import { CubeGrid } from "styled-loaders-react";
import Communitypost from "./views/Components/CommunityPost";
import UploadProductPage from "./views/UploadProductPage/UploadProductPage";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
import CartPage from "./views/CartPage/CartPage";
import OriginalPage from "./views/Originals/Original";
import ChatPage from "./views/ChatPage/ChatPage";
import UserPage from "./views/UserPage/UserPage";
import ProfilePageHeader from "./views/Components/Profile";
import ChallengesPage from "./views/ChallengesPage/ChallengesPage";
import ParticipatePage from "./views/ParticipatePage/ParticipatePage";

const HistoryPage = lazy(() => import("./views/HistoryPage/HistoryPage"));
const LoginPage = lazy(() => import("./views/LoginPage/LoginPage"));
const LandingPage = lazy(() => import("./views/LandingPage/LandingPage"));
const RegisterPage = lazy(() => import("./views/RegisterPage/RegisterPage"));

function App() {
  return (
    <Suspense
      fallback={
        <div>
          <CubeGrid size='80px' />
        </div>
      }
    >
      <div style={{ paddingTop: "0px" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/community" component={Auth(Communitypost, true)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, true)} />
          <Route exact path="/history" component={Auth(HistoryPage, true)} />
          <Route exact path="/user/profile" component={Auth(ProfilePageHeader, true)} />
          <Route exact path="/user/originals" component={Auth(OriginalPage, true)} />
          <Route exact path="/user/savedContent" component={Auth(CartPage, true)} />
          <Route exact path="/community/description" component={Auth(ChatPage, true)} />
          <Route exact path="/user/:userId" component={Auth(UserPage, true)} />
          <Route exact path="/challenges" component={Auth(ChallengesPage, null)} />
          <Route exact path="/challenges/participate" component={Auth(ParticipatePage, true)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
