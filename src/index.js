import React from 'react'
import ReactDOM from 'react-dom'

import useModel from './useModel'
import ObjectDetectionVideo from './object-detection-video/ObjectDetectionVideo'

import './index.css'

const handlePrediction = (predictions) => {
  console.timeEnd('detect')
  console.time('detect')
  console.log(predictions)
}

const render = (ctx, predictions) => {
  predictions.forEach((prediction) => {
    const x = prediction.bbox[0]
    const y = prediction.bbox[1]
    const width = prediction.bbox[2]
    const height = prediction.bbox[3]

    ctx.setStrokeStyle('#0062ff')
    ctx.setLineWidth(4)
    ctx.strokeRect(
      Math.round(x),
      Math.round(y),
      Math.round(width),
      Math.round(height)
    )
  }
  const detectFromVideoFrame = async video => {
  try {
    const predictions = await objectDetector.detect(video)
    const personDetections = predictions.filter(p => p.class === "human")
    showDetections(video, personDetections)
    var audio = new Audio('humans.mp3');
     audio.play();
    requestAnimationFrame(() => {
      detectFromVideoFrame(video)
    })
  } catch (error) {
    console.log("error")
    console.error(error)
  }
})
}
 try {
    const predictions = await objectDetector.detect(video)
    const personDetections = predictions.filter(p => p.class === "animal")
    showDetections(video, personDetections)
    var audio = new Audio('animals.mp3');
     audio.play();
    requestAnimationFrame(() => {
      detectFromVideoFrame(video)
    })
  } catch (error) {
    console.log("error")
    console.error(error)
  }
})
}
const App = () => {
  const model = useModel(process.env.PUBLIC_URL + '/model_web')

  return (
    <div className="fillPage">
      <ObjectDetectionVideo
        model={model}
        // onPrediction={handlePrediction}
        // render={render}
        // aspectFill: The option to scale the video to fill the size of the view.
        //             Some portion of the video may be clipped to fill the view's
        //             bounds.
        // aspectFit:  The option to scale the video to fit the size of the view
        //             by maintaining the aspect ratio. Any remaining area of the
        //             view's bounds is transparent.
        fit="aspectFill"
        // mirrored:   mirror the video about its vertical axis.
        mirrored
      />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
