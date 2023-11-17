import './globalStyleImports';

import {ApolloProvider} from '@apollo/client';
import {
  getNightMode,
  updateUserInfo,
  useViewerUserInfo,
} from '@wandb/weave/common/hooks/useViewerUserInfo';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import useMousetrap from 'react-hook-mousetrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {StateInspector} from 'reinspect';

import {apolloClient} from './apollo';
import {onAppError} from './components/automation';
import PagePanel from './components/PagePanel';
import {PanelRootContextProvider} from './components/Panel2/PanelPanel';
import {WeaveMessage} from './components/Panel2/WeaveMessage';
import getConfig from './config';
import {WeaveViewerContextProvider} from './context/WeaveViewerContext';
import {NotebookComputeGraphContextProvider} from './contextProviders';
import {
  URL_BROWSE,
  URL_BROWSE2,
  URL_LOCAL,
  URL_RECENT,
  URL_TEMPLATES,
  URL_WANDB,
} from './urls';
import {Browse2} from './components/PagePanelComponents/Home/Browse2';
import {PanelInteractContextProvider} from './components/Panel2/PanelInteractContext';

class ErrorBoundary extends React.Component<{}, {hasError: boolean}> {
  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }
  constructor(props: {}) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    onAppError(
      'Error: ' +
        error.stack +
        '\nReact Component Stack: ' +
        errorInfo.componentStack
    );
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <WeaveMessage>
          Something went wrong. Check the javascript console.
        </WeaveMessage>
      );
    }

    return this.props.children;
  }
}

type ThemerProps = {
  children: React.ReactNode;
};

const setPageNightMode = (isNightMode: boolean) => {
  if (isNightMode) {
    // Note: This adds the 'night-mode' class to the <html> element.
    // If we add the class to a different element, the night mode css filter breaks position:fixed components, e.g. <ViewBar>.
    // Google 'css filter position fixed' for more details.
    // Surprising fix found here: https://developpaper.com/explain-the-reasons-and-solutions-of-the-conflict-between-filter-and-fixed-in-detail/
    document.documentElement.classList.add('night-mode');
    // Used for tailwind dark mode
    document.documentElement.setAttribute('data-mode', 'dark');
  } else {
    document.documentElement.classList.remove('night-mode');
    document.documentElement.removeAttribute('data-mode');
  }
};

// Handle light/dark mode theme
const Themer = ({children}: ThemerProps) => {
  const {loading, userInfo} = useViewerUserInfo();

  useMousetrap('option+m', () => {
    const isNightMode = getNightMode(userInfo);
    setPageNightMode(!isNightMode);
    userInfo.betaFeatures.night = !isNightMode;
    updateUserInfo(userInfo);
  });

  useEffect(() => {
    if (!loading) {
      const isNightMode = getNightMode(userInfo);
      setPageNightMode(isNightMode);
    }
  }, [loading, userInfo]);

  return loading ? null : <>{children}</>;
};

type MainProps = {
  browserType?: string;
};

const Main = ({browserType}: MainProps) => (
  <React.Suspense fallback="loading">
    <ErrorBoundary>
      <NotebookComputeGraphContextProvider>
        <StateInspector name="WeaveApp">
          <PanelRootContextProvider>
            <WeaveViewerContextProvider>
              <Themer>
                <PagePanel browserType={browserType} />
              </Themer>
            </WeaveViewerContextProvider>
          </PanelRootContextProvider>
        </StateInspector>
      </NotebookComputeGraphContextProvider>
    </ErrorBoundary>
  </React.Suspense>
);

const Browse2Wrapper = () => (
  <React.Suspense fallback="loading">
    <ErrorBoundary>
      <NotebookComputeGraphContextProvider>
        <StateInspector name="WeaveApp">
          <PanelRootContextProvider>
            <WeaveViewerContextProvider>
              <PanelInteractContextProvider>
                <Browse2 />
              </PanelInteractContextProvider>
            </WeaveViewerContextProvider>
          </PanelRootContextProvider>
        </StateInspector>
      </NotebookComputeGraphContextProvider>
    </ErrorBoundary>
  </React.Suspense>
);

const basename = getConfig().PREFIX;
ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Router basename={basename}>
      <Switch>
        <Route path={`/${URL_BROWSE}/${URL_RECENT}/:assetType?`}>
          <Main browserType={URL_RECENT} />
        </Route>
        <Route path={[`/${URL_BROWSE}/${URL_TEMPLATES}/:templateName?`]}>
          <Main browserType={URL_TEMPLATES} />
        </Route>
        <Route
          path={[
            `/${URL_BROWSE}/${URL_WANDB}/:entity?/:project?/:assetType?/:preview?`,
            `/${URL_BROWSE}/${URL_WANDB}/:entity?/:project?/:assetType?`,
            `/${URL_BROWSE}/${URL_WANDB}/:entity?/:project?`,
            `/${URL_BROWSE}/${URL_WANDB}/:entity?`,
          ]}>
          <Main browserType={URL_WANDB} />
        </Route>
        <Route path={`/${URL_BROWSE}/${URL_LOCAL}/:assetType?/:preview?`}>
          <Main browserType={URL_LOCAL} />
        </Route>
        <Route
          path={`/${URL_BROWSE2}/:entity?/:project?/:rootType?/:objName?/:objVersion?/:refExtra*`}>
          <Browse2Wrapper />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
