import React from 'react'
import { Alert, Modal,Text, Pressable, View  } from 'react-native'
import { useDispatch,useSelector } from 'react-redux';
import {ModalState,AccessibiliteState} from '../../redux/actions'
import { RadioButton } from 'react-native-paper';
import styles from './styles'

const Modals = ({modalOpen,isElectrode}) => {

  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState('Inconnue');
  const [checked2, setChecked2] = React.useState('Inconnue');
 
  const dispatchAccessibility = () =>{
    dispatch(AccessibiliteState({"checked": checked ,"isPediatrique":checked2 }))
    dispatch(ModalState({'isModalOpen': false}))
  }
    return (
        <Modal visible={modalOpen} animationType='slide' transparent={true}  onRequestClose={() => {
            dispatch(ModalState({'isModalOpen': false}))
            
          }}>
       
         <View style={styles.centeredView}>
          { isElectrode ? (<View style={styles.modalView}>
                <View style = {{display:'flex', flexDirection:'row', alignItems:'center',alignContent:'space-between'}} >
                  <RadioButton
                      value="Inconnue"
                      status={ checked2 === 'Inconnue' ? 'checked' : 'unchecked' }
                      onPress={() => setChecked2('Inconnue')}
                    />
                    <Text>Inconnue</Text>
                  </View>

                  <View  style = {{display:'flex', flexDirection:'row', alignItems:'center'}}>
                  <RadioButton
                      value="Oui"
                      status={ checked2 === 'Oui' ? 'checked' : 'unchecked' }
                      onPress={() => setChecked2('Oui')}
                    />
                    <Text>Oui</Text>

                  </View >
          
                  <View  style = {{display:'flex', flexDirection:'row', alignItems:'center'}}>
                  <RadioButton
                    value="Non"
                    status={ checked2 === 'Non' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked2('Non')}
                  />
                  <Text>Non</Text>
                  </View>
            
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => dispatchAccessibility()}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>) : 
            <View>
              <View style={styles.modalView}>
                <View style = {{display:'flex', flexDirection:'row', alignItems:'center',alignContent:'space-between'}} >
                  <RadioButton
                      value="Inconnue"
                      status={ checked === 'Inconnue' ? 'checked' : 'unchecked' }
                      onPress={() => setChecked('Inconnue')}
                    />
                    <Text>Inconnue</Text>
                  </View>

                  <View  style = {{display:'flex', flexDirection:'row', alignItems:'center'}}>
                  <RadioButton
                      value="Privee"
                      status={ checked === 'Privee' ? 'checked' : 'unchecked' }
                      onPress={() => setChecked('Privee')}
                    />
                    <Text>Privee</Text>

                  </View >
          
                  <View  style = {{display:'flex', flexDirection:'row', alignItems:'center'}}>
                  <RadioButton
                    value="Public"
                    status={ checked === 'Public' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('Public')}
                  />
                  <Text>Public</Text>
                  </View>
            
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => dispatchAccessibility()}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
            </View>}
          </View>
        </Modal>
    )
}

export default Modals
