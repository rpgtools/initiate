import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';
import Counter from '../Counter';
import { DragHandle } from './SortableList';

// Used to determine how many counters to display on each token
const COUNTER_WIDTH = 62;

export default class InitiativeToken extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      maxCountersToDisplay: 0
    };
  };

  componentDidMount() {
    // TODO: if/when we add grid layout we will also need to listen for those resize events
    window.addEventListener('resize', this.handleComponentResize);
    this.handleComponentResize();
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleComponentResize);
    this.handleComponentResize.cancel();
  };

  handleComponentResize = debounce(() => {
    this.setState({
      maxCountersToDisplay:
        Math.floor(ReactDOM.findDOMNode(this).offsetWidth / COUNTER_WIDTH)
    });
  }, 100);

  handleDeleteCounter = counterIndex => () =>
    this.props.deleteCounter(this.props.creature.id, counterIndex);

  handleUpdateCounter = counterIndex => value =>
    this.props.updateCounter(this.props.creature.id, counterIndex, value);

  handleSelectCreature = e => {
    if (!e.target.className.startsWith('counter')) {
      this.props.selectCreature(this.props.creature.id);
    }
  };

  render () {
    const { creature } = this.props;
    const {
      handleSelectCreature,
      handleUpdateCounter,
      handleDeleteCounter
    } = this;
    const { maxCountersToDisplay } = this.state;

    return (
      <div
        className="initiative__token"
        onClick={handleSelectCreature}
        >
        <h2 className="initiative__token--title">{creature.name}</h2>
        <div className="initiative__token--counters">
          {creature.counters.slice(0, maxCountersToDisplay).map((counter, index) =>
            <Counter
              key={index}
              label={counter.label}
              value={counter.value}
              handleUpdateValue={handleUpdateCounter(index)}
              onClickDelete={handleDeleteCounter(index)}
              />
          )}
        </div>
          <DragHandle />
        </div>
      );
  }
};
