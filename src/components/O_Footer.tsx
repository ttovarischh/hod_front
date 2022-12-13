// deprecated

import React, { useContext, FC } from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { FlexBox, EffectsTabIcon, HomeIcon } from '../common';
import { ThemeContext } from 'styled-components'
import { SmallText } from '../common/StyledFont';
import A_Icon from './A_Icon';

const FooterWrapper = styled(FlexBox)`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.bottomBar.bg};
  border-bottom-left-radius: 22%;
  border-bottom-right-radius: 22%;
`;

// @ts-nocheck
interface TabProps {
    isPrima?: boolean,
    isLeft?: boolean,
    isRight?: boolean,
}

const Tab = styled(FlexBox)`
  padding-top: 16px;
  padding-bottom: 16px;
  border-top-right-radius: ${({ isLeft = false }: TabProps) => (isLeft ? "10px" : "0")};
  border-top-left-radius: ${({ isRight = false }: TabProps) => (isRight ? "10px" : "0")};
  border-bottom-right-radius: ${({ isLeft = false }: TabProps) => (isLeft ? "10px" : "22%")};
  border-bottom-left-radius: ${({ isRight = false }: TabProps) => (isRight ? "10px" : "22%")};
  padding-left: ${({ isPrima = false }: TabProps) => (isPrima ? "32px" : "0")};
  padding-right: ${({ isPrima = false }: TabProps) => (isPrima ? "32px" : "0")};
  background-color: ${({ isPrima = false }: TabProps) => (isPrima ? ({ theme }) => theme.bottomBar.tab : "transparent")};
`;

const TabText = styled(SmallText)`
  margin-top: 12px;
`;

export default function O_Footer (props: any) {
    const theme = useContext(ThemeContext)
    return (
        <FooterWrapper alignItems='center' justifyContent='space-between'>
            <Tab direction="column" alignItems='center' isLeft={true} isPrima={true}>
                <A_Icon iconName="effects" fill={theme.bottomBar.ic}></A_Icon>
                <TabText>Эффекты</TabText>

            </Tab>
            <Tab direction="column" alignItems='center'>
                <A_Icon iconName="home" fill={theme.bottomBar.ic}></A_Icon>
                <TabText>Главная</TabText>
            </Tab>
            <Tab direction="column" alignItems='center' isRight={true} isPrima={true}>
                <A_Icon iconName="profile" fill={theme.bottomBar.ic}></A_Icon>
                <TabText>Профиль</TabText>
            </Tab>
        </FooterWrapper>
    );
}