import React, { useState, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    const cartTotalValue = products.reduce((accumulator, product) => {
      // eslint-disable-next-line no-param-reassign
      accumulator += product.price * product.quantity;

      return accumulator;
    }, 0);

    return formatValue(cartTotalValue);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const cartProductsQuantity = products.reduce(
      (totalQuantity, { quantity }) => {
        // eslint-disable-next-line no-param-reassign
        totalQuantity += quantity;

        return totalQuantity;
      },
      0,
    );

    return cartProductsQuantity;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
