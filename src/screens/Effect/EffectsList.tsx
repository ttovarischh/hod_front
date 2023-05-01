import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import axios from "axios";
import A_Loader from "../../components/Atoms/A_Loader";
import O_Header from "../../components/Organisms/O_Header";
import { FlatList } from "react-native";
import { consumer } from "../../constants";
import { FlexBox } from "../../common";
import A_Effect from "../../components/Atoms/A_Effect";
import { useTranslation } from "react-i18next";

const EffectsScreenWrapper = styled.View`
  background-color: ${({ theme }) => theme.appBg};
  height: 100%;
  flex: 1;
  color: white;
  padding-left: 14px;
  padding-right: 14px;
`;

export default function EffectsList(props: { navigation: any }) {
  const { navigation } = props;
  const [isLoading, setLoading] = useState(true);
  const [effectsData, setEffectsData] = useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/effects")
      .then(({ data }) => {
        setEffectsData(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    const subscription = consumer.subscriptions.create(
      { channel: "EffectsChannel" },
      {
        received(data) {
          setEffectsData((messages) => messages.concat(data));
        },
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <A_Loader />;
  }

  return (
    <>
      <EffectsScreenWrapper>
        <O_Header center={t("common:effects")} />
        <FlexBox direction="column" offsetBottom="200">
          <FlatList
            data={effectsData}
            keyExtractor={(item) => item.id}
            style={{ height: "100%" }}
            renderItem={({ item }) => (
              <A_Effect
                item={item}
                onPress={() => navigation.push("Single", { effect: item })}
              />
            )}
          />
        </FlexBox>
      </EffectsScreenWrapper>
    </>
  );
}
