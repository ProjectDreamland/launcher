import React from 'react'

var progress, message, hide;

export
default React.createClass({
    render() {
        if(this.props.progress == 'finished' && !progress)
            return(<div/>);
        if (this.props.progress != 'finished') {
            progress = this.props.progress
            message = `Downloading ${progress.completed}/${progress.total} files`
        } else {
            message = `Sucessfully downloaded ${progress.completed}/${progress.total} files`
            progress.percent = 1;
            hide = true
        }
        
        return (
            <div className={`progress ${hide ? 'hide' : ''}`}>
                <p>{message}</p>
                <div className="progress-bar">
                    <div className="progress-bar-inner" style={{width: progress.percent*100 + '%'}}></div>
                </div>
            </div>
        )
    }
})