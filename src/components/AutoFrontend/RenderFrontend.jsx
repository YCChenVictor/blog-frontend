import React, { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'
import RenderOneComponent from './RenderOneComponent'

const RenderFrontend = () => {
  // Because GPT cannot read image, the ImageUpload wont work now
  // I will try to render a component posted by GPT first

  return (
    <div>
      {/* <ImageUpload /> */}
      <RenderOneComponent />
    </div>
  )
}

export default RenderFrontend
