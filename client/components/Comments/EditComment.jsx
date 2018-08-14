import React from 'react'
import { connect } from 'react-redux'
import { updateComment } from '../../actions/comments'

class EditComment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      comment: this.props.comment,
      error: null
    }
    this.getComment = this.getComment.bind(this)
    this.editComment = this.editComment.bind(this)
  }

  getComment(e) {
    this.setState({
      comment: e.target.value.substr(0, 50)
    })
  }

  editComment () {
    this.setState({
      error: null
    })
    const comment = {
      comment: this.state.comment,
      id: this.props.id
    }
    this.props.updateComment(comment)
      .catch(err => this.setState({error: err.message}))
  }

  render() {

  return (
    <form className="editComment" onSubmit={this.editComment} >
      <textarea id="editComment" rows="4" cols="100" value={this.state.comment} onChange={this.getComment}></textarea><br />
      <button className='button' id="cancelButton">Cancel</button>
      <button className='button' id="button">Submit</button>
    </form>
  )
}
}

function mapDispatchToProps(dispatch) {
  return {
    updateComment: (comment) => {
      return dispatch(updateComment(comment))
    }
  }
}

export default connect(null, mapDispatchToProps)(EditComment)