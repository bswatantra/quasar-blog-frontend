import axios from 'axios';
let actions = {
	createPost ( { commit }, post ) {
		axios.post( 'http://vue-learn.test/api/posts', post )
			.then( res => {
				commit( 'CREATE_POST', res.data );
			} ).catch( error => {
				if ( error.response.status === 422 )
				{
					commit( 'RECORD_ERRORS', error.response.data.errors );
				}
			} );
	},
	fetchPosts ( { commit } ) {
		commit( 'LOADING', true );
		axios.get( 'http://vue-learn.test/api/posts' )
			.then( res => {
				commit( 'FETCH_POSTS', res.data.data );
				commit( 'LOADING', false );
			} ).catch( err => {
				console.log( err );
			} );
	},
	deletePost ( { commit }, post ) {
		axios.delete( `http://vue-learn.test/api/posts/${ post.id }` )
			.then( res => {
				if ( res.data === 'ok' )
					commit( 'DELETE_POST', post );
			} ).catch( err => {
				console.log( err );
			} );
	},
};

export default actions;