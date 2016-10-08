import React, { PropTypes } from 'react';
import PageTitle from '../../components/PageTitle';

class NotFound extends React.Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    let title = '页面未找到';
    this.context.onSetTitle(title);
    return (
      <div>
        <PageTitle title={title} />
        <p>对不起，你要浏览的页面不存在。</p>
      </div>
    );
  }

}

export default NotFound;
