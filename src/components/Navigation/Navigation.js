import React from 'react'

const Navigation = ({isSignedIn , onRouteChange}) => {

	if(isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p 
					onClick={() => onRouteChange('signin')}
					className="f3 link dim black underline pa2 ma1 pointer">Sign Out</p>
			</nav>
		)
	} else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p 
					onClick={() => onRouteChange('signin')}
					className="f3 link dim black underline pa2 ma1 pointer">Sign In</p>
				<p 
					onClick={() => onRouteChange('register')}
					className="f3 link dim black underline pa2 ma1 pointer">Register</p>
			</nav>
		)
	}
}

export default Navigation;