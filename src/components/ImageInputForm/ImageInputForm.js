import React from 'react'
import "./ImageInputForm.css"

const ImageInputForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div>
			<p className="f3">{"This is magic brain will detect face in your image."}</p>
			<div className="center">
			<div className="center imageform pa4 br3 shadow-5">
				<input 
					className="f4 pa2 w-70 center" 
					type="text" 
					onChange={onInputChange}
				/>
				<button 
					className="f4 link w-30 grow ph3 pv2 dib white bg-light-purple"
					onClick={onButtonSubmit}
				>
					Detect
				</button>
			</div>
			</div>
		</div>
	)
}

export default ImageInputForm;