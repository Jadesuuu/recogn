import React, { useEffect, useState } from 'react'
import { View, Text, Image, Button, Modal } from 'react-native'
import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-react-native'
import ActivityIndicator from './ActivityIndicator'

function Output({ outputData, onClose }: { 
  outputData: number[]
  onClose: () => void
 }) {
  // Expected output shape for MobileNet
  const [label, setLabel] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)


  const expectedOutputShape = [1, 1001]

  // Verify and process output data (TODO: handle errors appropriately) 
  if (!outputData || outputData.length !== expectedOutputShape[0] * expectedOutputShape[1]) {
    console.error('Invalid output data shape')
    return <Text>Error: Invalid output data.</Text>
  }

  // Extract top 3 predictions
  const top3Predictions = outputData
    .map((score, index) => ({ score, index }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(prediction => `${label[prediction.index]}: ${prediction.score.toFixed(3)}`)

  return (
    <Modal visible={true} onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginTop: 20 }}>Top 3 Predictions:</Text>
        <View style={{ flexDirection: 'column' }}>
          {top3Predictions.map((prediction, index) => (
            <Text key={index}>{prediction}</Text>
          ))}
        </View>
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  )
}

export default Output
