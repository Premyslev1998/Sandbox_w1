import * as React from "react";
import { render } from "react-dom";

import "./styles.css";

interface newsItem {
  title: string;
  text: string;
}

const newsList: Array<newsItem> = [
  { title: "News 1", text: "Help Me PLS" },
  { title: "News 2", text: "Help Me 2" },
  { title: "News 3", text: "Help Me 3" }
];

interface NewsListProps {
  newsArray: newsItem[];
  renderFunc: (item: newsItem) => JSX.Element;
  initialPageSize: number;
}

interface NewsListState {
  currentPage: number;
  pageSize: number;
}

class NewsList extends React.Component<NewsListProps, NewsListState> {
  state = {
    currentPage: 1,
    pageSize: this.props.initialPageSize
  };
  render() {
    const { newsArray, renderFunc } = this.props;
    const { currentPage, pageSize } = this.state;
    const arr = newsArray.slice(
      (currentPage - 1) * pageSize,
      (currentPage - 1) * pageSize + pageSize
    );
    return <div>{arr.map(renderFunc)}</div>;
  }
}

const renderNewsItem = (item: newsItem) => {
  const { text, title } = item;
  return (
    <div>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
};

class App extends React.Component {
  render() {
    return (
      <NewsList
        newsArray={newsList}
        initialPageSize={3}
        renderFunc={renderNewsItem}
      />
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
