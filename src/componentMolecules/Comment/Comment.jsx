import React, { Fragment } from 'react'
import { Media, Input } from 'reactstrap'
import { Exports } from 'componentAtoms'
import { stopUndefined } from 'utils'

const { Button, AvatarUserStoreUser } = stopUndefined(Exports)

const COMMENT_ID = 'id'
const COMMENT_NAME = 'name'
const COMMENT_POSTED_TIME = 'postedTime'
const COMMENT_AVATAR = 'avatar'
const COMMENT_BODY = 'body'
const COMMENT_NUM_COMMENTS = 'numComments'

const Comments = props => {
	const { comments } = props
	const comments_ = comments || []
	return comments_.map(comment => {
		const {
			[COMMENT_ID]: id,
			[COMMENT_NAME]: name,
			[COMMENT_POSTED_TIME]: time,
			[COMMENT_AVATAR]: src,
			[COMMENT_BODY]: body,
			[COMMENT_NUM_COMMENTS]: commentsNumber,
		} = comment
		return (
			<Fragment key={id}>
				<Comment
					name={name}
					time={time}
					src={src}
					body={body}
					commentsNumber={commentsNumber}
				/>
			</Fragment>
		)
	})
}

const Comment = props => {
	const { body, name, time, commentsNumber, src } = props
	return (
		<Media>
			<div className='pull-left'>
				<div className='avatar'>
					<Media alt='Avatar Comment' className='img-raised' src={src} />
				</div>
			</div>
			<Media body>
				<Media heading tag='h5'>
					{name}
					<small className='text-muted'>· {time}</small>
				</Media>
				<p>{body}</p>
				<div className='media-footer'>
					<Button
						className='btn-simple pull-right'
						color='primary'
						href='#pablo'
						id='tooltip871944617'
						onClick={e => e.preventDefault()}
						size='sm'
					>
						<i className='tim-icons icon-send' /> Reply
					</Button>
					<Button
						className='btn-simple pull-right'
						color='danger'
						href='#pablo'
						onClick={e => e.preventDefault()}
						size='sm'
					>
						<i className='tim-icons icon-heart-2' />
						{commentsNumber}
					</Button>
				</div>
			</Media>
		</Media>
	)
}

const CreateCommentInput = props => {
	return (
		<Media className='media-post'>
			<a
				className='pull-left author'
				href='#pablo'
				onClick={e => e.preventDefault()}
			>
				<AvatarUserStoreUser />
			</a>
			<Media body>
				<Input
					placeholder='Write a nice reply or go home...'
					rows='4'
					type='textarea'
				/>
				<div className='media-footer'>
					<Button
						className='pull-right'
						color='primary'
						href='#pablo'
						onClick={e => e.preventDefault()}
					>
						Reply
					</Button>
				</div>
			</Media>
		</Media>
	)
}

const CommentsList = props => {
	const { comments } = props
	return (
		<Fragment>
			<div className='container'>
				<h3 className='title text-center'>Post your comment</h3>
				<CreateCommentInput />
				<div className='container'>
					<Comments comments={comments} />
				</div>
			</div>
		</Fragment>
	)
}

export {
	Comment,
	COMMENT_NAME,
	COMMENT_POSTED_TIME,
	COMMENT_AVATAR,
	COMMENT_BODY,
	COMMENT_NUM_COMMENTS,
	COMMENT_ID,
	CommentsList,
}
