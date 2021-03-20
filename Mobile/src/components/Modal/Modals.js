import React from 'react'
import { Alert, Modal,Text, Pressable, View,Title  } from 'react-native'
import { useDispatch,useSelector } from 'react-redux';
import {ModalState,AccessibiliteState} from '../../redux/actions'
import { RadioButton } from 'react-native-paper';
import styles from './styles'
import { COLORS } from '../../Constantes';

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
            <View style={styles.Header}>
                  <Text style={styles.TextHeader}>Electrode pediatrique ?</Text>
                </View>
                <View style = {{display:'flex', flexDirection:'row', alignItems:'center',alignItems:'center',right:33}} >
                  <RadioButton
                      value="Inconnue"
                      color={COLORS.primary}
                      status={ checked2 === 'Inconnue' ? 'checked' : 'unchecked' }
                      onPress={() => setChecked2('Inconnue')}
                    />
                    <Text style={styles.text}>Inconnue</Text>
                  </View>

                  <View  style = {{display:'flex', flexDirection:'row', alignItems:'center',right:56}}>
                  <RadioButton
                      value="Oui"
                      color={COLORS.primary}
                      status={ checked2 === 'Oui' ? 'checked' : 'unchecked' }
                      onPress={() => setChecked2('Oui')}
                    />
                    <Text style={styles.text}>Oui</Text>

                  </View >
          
                  <View  style = {{display:'flex', flexDirection:'row', alignItems:'center',right:53}}>
                  <RadioButton
                    value="Non"
                    color={COLORS.primary}
                    status={ checked2 === 'Non' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked2('Non')}
                  />
                  <Text style={styles.text}>Non</Text>
                  </View>
            
              <Pressable
                style={[styles.button,]}
                onPress={() => dispatchAccessibility()}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>) : 
            <View>
              <View style={styles.modalView}>
                <View style={styles.Header}>
                  <Text style={styles.TextHeader}>Accessibilité             ?</Text>
                </View>
                <View style = {{display:'flex', flexDirection:'row', alignItems:'center',alignItems:'center',right:34.5}} >
                  <RadioButton
                      value="Inconnue"
                      color={COLORS.primary}
                      status={ checked === 'Inconnue' ? 'checked' : 'unchecked' }
                      onPress={() => setChecked('Inconnue')}
                    />
                    <Text style={styles.text}>Inconnue</Text>
                  </View>

                  <View  style = {{display:'flex', flexDirection:'row', alignItems:'center',right:47}}>
                  <RadioButton
                      value="Privee"
                      color={COLORS.primary}
                      status={ checked === 'Privee' ? 'checked' : 'unchecked' }
                      onPress={() => setChecked('Privee')}
                    />
                    <Text style={styles.text}>Privee</Text>

                  </View >
          
                  <View  style = {{display:'flex', flexDirection:'row', alignItems:'center',right:46.5}}>
                  <RadioButton
                    value="Public"
                    color={COLORS.primary}
                    status={ checked === 'Public' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('Public')}
                  />
                  <Text style={styles.text}>Public</Text>
                  </View>
            
              <Pressable
                style={[styles.button,]}
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
