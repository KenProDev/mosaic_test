import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { withRouter } from 'react-router';

const MaxWidth = {
  web: 750,
  mobile: 350,
  form: 315
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  color: 'white',

  background: isDragging ? "#0069d9" : "#007bff",

  ...draggableStyle
});

const getListStyle = (isDraggingOver, width = 750) => ({
  background: isDraggingOver ? "#e3e3e3" : "#efefef",
  padding: grid,
  width,
});

class NewsList extends React.Component {
  state = {
    windowWidth: 0,
  }

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions();
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    if (this._isMounted) {
      const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
      this.setState({ windowWidth });
    }
  }

  getWidth = () => {
    if (this.state.windowWidth > 800) {
      return MaxWidth.web;
    }
    if (this.state.windowWidth > 350) {
      return MaxWidth.mobile;
    }
    return MaxWidth.form;
  }

  onDragEnd = (result) => {
    const { news, onChangeOrder } = this.props;
    if (!result.destination) {
      return;
    }

    const items = reorder(
      news,
      result.source.index,
      result.destination.index
    );

    onChangeOrder(items);
  }

  handleNavigation = (articleId) => () => {
    this.props.history.push(`/detail/${articleId}`);
  }

  render() {
    const { loadingState, news, onLoadMore } = this.props;
    const width = this.getWidth();
    return (
      <div className="wrapper" style={{ width }}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver, width)}
              >
                {news.map((article, index) => (
                    <Draggable key={article.id} draggableId={article.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          onClick={this.handleNavigation(article.id)}
                        >
                          {article.title}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="load_more" onClick={onLoadMore}>
          {loadingState === 'attaching' ? 'Loading' : 'Load More'}
        </div>
      </div>
    )
  }
}

export default withRouter(NewsList);
