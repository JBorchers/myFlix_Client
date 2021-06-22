import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './director-view.scss';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick, movies } = this.props;

    return (
      <div className="director-view">
        <div className="director-name">
          <span className="label">Director: </span>
          <span className="value">{director.Name}</span>
        </div>
        <div className="director-bio">
          <span className="label">Bio: </span>
          <span className="value">{director.Bio}</span>
        </div>
        <div className="director-birth">
          <span className="label">Born: </span>
          <span className="value">{director.Birth}</span>
        </div>
        <Button variant="secondary" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
  }),
  onBackClick: PropTypes.func.isRequired
};