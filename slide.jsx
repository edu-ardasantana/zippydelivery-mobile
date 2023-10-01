import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default function Slide() {

    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    function incrementQuantity() { setQuantity(quantity + 1) }
    function decrementQuantity() { quantity > 0 && setQuantity(quantity - 1) }

    function formatarMoeda(dataParam) {
        return dataParam
            ? dataParam.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : '';
    }

    function flagFavorite() { setIsFavorite(!isFavorite) };

    const heartImageSource = isFavorite
    ? { uri: 'https://api.iconify.design/material-symbols:favorite-rounded.svg' }
    : { uri: 'https://api.iconify.design/material-symbols:favorite-outline-rounded.svg' };

    return (
        <View style={styles.slide}>
            <View style={styles.line1}>
                <Image style={styles.itemImage} source={require('/views/img/item.png')} />
                <TouchableOpacity style={styles.heartButton} onPress={flagFavorite}>
                    <Image style={[styles.icon, { margin: 8 }]} source={heartImageSource} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.line2}>
                <Text style={styles.title3}>Salada Ravanello {'>'}</Text>
            </TouchableOpacity>

            <View style={styles.line2}>
                <Text style={[styles.title2, { color: '#82F3FF' }]}>{formatarMoeda(44.90)}</Text>
            </View>

            <View style={[styles.line4, { marginTop: 10 }]}>
                <TouchableOpacity onPress={decrementQuantity} style={styles.button}>
                    <Image style={[styles.icon, { width: 16 }]} source={{ uri: 'https://api.iconify.design/material-symbols:remove-rounded.svg' }} />
                </TouchableOpacity>

                <Text style={[styles.title2, { marginLeft: 20, marginRight: 20 }]}>{quantity}</Text>

                <TouchableOpacity onPress={incrementQuantity} style={styles.button}>
                    <Image style={[styles.icon, { width: 16 }]} source={{ uri: 'https://api.iconify.design/material-symbols:add-rounded.svg' }} />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="incluir"
                    buttonStyle={{ backgroundColor: '#750310', width: 140, height: 30, marginTop: 10 }}
                    titleStyle={{ color: 'white', fontSize: 15 }}
                /* onPress={() => navigation.navigate('Tela')} */
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    slide: {
        width: 180,
        height: 270,
        backgroundColor: '#00070A',
        marginHorizontal: 7,
        borderRadius: 5,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
    itemImage: {
        width: 90,
        height: 90,
        bottom: 0,
    },
    heartButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    line1: {
        width: '100%',
        height: 110,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    line2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    line4: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title2: {
        color: '#E1E1E6',
        fontSize: 17,
        letterSpacing: 1.2,
        fontWeight: '450',
    },
    title3: {
        color: '#E1E1E6',
        fontSize: 15,
        fontWeight: '400',
    },
    icon: {
        tintColor: '#E1E1E6',
        width: 25,
        height: 25,
    },
});
