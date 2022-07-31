import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HandleKakaoLogin } from './components';
import {
  MainPage,
  SplashPage,
  JoinPage,
  FeedbackPage,
  EditModePage,
  EmailCertPage,
  MyPage,
} from './pages';
import PublishingSplitPage from './pages/PublishingSplitPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={SplashPage} />
        <Route exact path='/main' component={MainPage} />
        <Route exact path='/join' component={JoinPage} />
        <Route exact path='/feedback' component={FeedbackPage} />
        <Route exact path='/callback/kakao' component={HandleKakaoLogin} />
        <Route exact path='/:personalUrl/' component={MyPage} />
        {/* 나중에 pageUrl로 바껴야 됨 */}
        <Route
          exact
          path='/:personalUrl/:publishingUrl/edit'
          component={EditModePage}
        />
        <Route
          exact
          path='/:personalUrl/:publishingUrl'
          component={PublishingSplitPage}
        />
        <Route
          exact
          path='/:personalUrl/:publishingUrl/:pageUrl'
          component={PublishingSplitPage}
        />
        <Route
          exact
          path='/certificate/:email/:code'
          component={EmailCertPage}
        />
        <Route path='/'>
          <div> 존재하지 않는 페이지입니다. </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
