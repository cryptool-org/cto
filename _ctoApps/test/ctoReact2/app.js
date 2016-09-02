var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var INTERVAL = 2000;

var AnimateDemo = React.createClass({
    getInitialState: function() {
        return {current: 0};
    },

    componentDidMount: function() {
        this.interval = setInterval(this.tick, INTERVAL);
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    tick: function() {
        this.setState({current: this.state.current + 1});
    },

    render: function() {
        var children = [];
        var pos = 0;
        var colors = ['red', 'gray', 'blue'];
        for (var i = this.state.current; i < this.state.current + colors.length; i++) {
            var style = {
                left: pos * 128,
                background: colors[i % colors.length]
            };
            pos++;
            children.push(<div key={i} className="animateItem" style={style}>{i}</div>);
        }
        return (
            <CSSTransitionGroup
        className="animateExample"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
        transitionName="example">
            {children}
            </CSSTransitionGroup>
        );
    }
});

ReactDOM.render(
<AnimateDemo />,
    document.getElementById('myReact2')
);