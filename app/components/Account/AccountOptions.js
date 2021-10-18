import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions(props){
    const{userInfo, setReloadUserInfo} = props;
   const [showModal, setShowModal] = useState(false);
   const [renderComponent, setRenderComponent] = useState(null);

    const selectedComponent = (key) => {
        switch(key){
            case "displayName":
                setRenderComponent(
                            <ChangeDisplayNameForm
                            displayName={userInfo.displayName}
                            setShowModal={setShowModal}
                            setReloadUserInfo={setReloadUserInfo}
                            />);
                setShowModal(true);
                break;

            case "changeEmail":
                setRenderComponent(
                            <ChangeEmailForm
                            email={userInfo.email}
                            setShowModal={setShowModal}
                            setReloadUserInfo={setReloadUserInfo}
                            />);
                setShowModal(true);
                break;

            case "changePassword":
                setRenderComponent(
                            <ChangePasswordForm
                            setShowModal={setShowModal}
                            />);
                setShowModal(true);
                break;

            default:
                setRenderComponent(null);
                break;

        }

    }
    
    const menuOptions = generateOptions(selectedComponent);

    return(
        <View>
            {map(menuOptions, (menu, index) => (
                

                <ListItem key={index} bottomDivider onPress={menu.onPress} >
                    <Icon name={menu.iconNameLeft}
                    type = {menu.iconType}
                    color = {menu.iconColorLeft}
                    />
                    <ListItem.Content>
                        <ListItem.Title>
                            {menu.title}
                        </ListItem.Title>          
                    </ListItem.Content>
                    <ListItem.Chevron />
                    
                </ListItem>
            ))}

             {renderComponent && (
                 <Modal isVisible={showModal} setIsVisible={setShowModal}>
                {renderComponent}
                </Modal>
             )}   
            

        </View>
    );
}

function generateOptions(selectedComponent){
    return[
        {title: "Cambiar nombre se usuario",
         iconType: "material-community",
         iconNameLeft: "account-circle",
         iconColorLeft: "#00a680",
         onPress: () => selectedComponent("displayName")
         
         },

        {title: "Cambiar dirección de email",
        iconType: "material-community",
        iconNameLeft: "at",
        iconColorLeft: "#00a680",
        onPress: () => selectedComponent("changeEmail"),
    },

        {title: "Cambiar contraseña",
    iconType: "material-community",
         iconNameLeft: "lock-reset",
         iconColorLeft: "#00a680",
         onPress: () => selectedComponent("changePassword"),}
    ];
}