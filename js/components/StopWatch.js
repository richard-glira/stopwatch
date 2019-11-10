var StopWatch = React.createClass({
    getInitialState: function() {
        return {
            time: 0,
            until: 0,
            enabled: true
        };
    },
    finish: function() {
        /**
         *  TIP: You can also reset entire state with the following line below, *WARNING this will reset the entire state might not be ideal in all situations
         *      this.replaceState(this.getInitialState());
         *
         *  The react state reset is equivalent to Vue.js reset state
         *      letcurrentState = deepClone(this.state)
         *
         *      var newState = Object.assign(currentState, {
         *          a: resetStateA
         *      });
         *
         *      this.$store.replaceState(newState);
         */
        this.setState({ enabled: true, time: 0, until: '' });

        React.findDOMNode(this.refs.timer).focus();

        return clearInterval(this.interval);
    },
    isTimeUp: function() {
        return parseInt(this.state.time) === parseInt(this.state.until);
    },
    keystroke: function(event) {
        this.setState({ until: event.target.value });
    },
    start: function() {
        this.setState({ enabled: false });

        this.interval = setInterval(() => {
            this.tick();

            if (this.isTimeUp()) {
                this.finish();

                alertify.alert('Ding Ding Ding', 'Time is up!', function() {
                    alertify.success('Success!');
                });
            }
        }, 1000)
    },
    tick: function() {
        this.setState({ time: this.state.time + 1 });
    },
    render: function() {
        return (
            <div>
                <div>
                    <input className="form-control" type="text" placeholder="Enter a time in seconds..." ref="timer" onChange={ this.keystroke } value={ this.state.until }  />
                </div>
                <div>
                    <button className="btn btn-primary" disabled={ !this.state.enabled } onClick={this.start}>Start</button>
                </div>

                <h1>{ this.state.time }</h1>
            </div>
        );
    }
});

/**
 * In react you can also use a closure/callback to focus an element.
 * <input className="form-control" type="text" placeholder="Enter a time in seconds..." ref={ (componentElementOrNode) => { React.findDOMNode(componentElementOrNode).focus() } } onChange={ this.keystroke } value={ this.state.until }  />
 */

React.render(<StopWatch />, document.body);
