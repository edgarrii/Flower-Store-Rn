import React from "react";
import {
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import Colors from "../../consts/colors";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}>
        <ScrollView>
          <Image
            style={styles.image}
            source={{ uri: selectedProduct.imageUrl }}
          />
          <Text style={styles.description}>{selectedProduct.description}</Text>
          <Text style={styles.price}>
            Price: ${selectedProduct.price.toFixed(2)}
          </Text>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  description: {
    fontFamily: "open-sans",
    marginHorizontal: 40,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    flex: 0.1,
    alignItems: "center",
  },
});

export default ProductDetailScreen;
