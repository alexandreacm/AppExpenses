import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";

import { EXPENSES } from "../utils/expenses";

import { Card, CardProps } from "../components/Card";
import { Header, MonthsProps } from "../components/Header";

import { Container, Chart } from "./styles";

import { VictoryPie, VictoryTooltip } from "victory-native";

export function Home() {
  const [selected, setSelected] = useState("");
  const [month, setMonth] = useState<MonthsProps>("Janeiro");
  const [data, setData] = useState<CardProps[]>([]);

  function handleCardOnPress(id: string) {
    setSelected((prev) => (prev === id ? "" : id));
  }

  useEffect(() => {
    setData(EXPENSES[month]);
  }, [month]);

  return (
    <Container>
      <Header onValueChange={setMonth} selectedValue={month} />

      <Chart>
        <VictoryPie
          width={300}
          data={data}
          x={"label"}
          y={"value"}
          style={{
            labels: {
              fill: "#FFF",
            },
            data: {
              fillOpacity: ({ datum }) =>
                datum.id === selected || datum.id === "" ? 1 : 0.3,
              stroke: ({ datum }) =>
                datum.id === selected ? datum.color : "none",
              strokeOpacity: 0.5,
              strokeWidth: 8,
            },
          }}
          padAngle={3}
          colorScale={data.map((expense) => expense.color)}
          innerRadius={60}
          animate={{
            duration: 500,
            easing: "elastic",
          }}
          labelComponent={
            <VictoryTooltip
              renderInPortal={false}
              flyoutStyle={{
                stroke: 0,
                fill: ({ datum }) => datum.color,
              }}
            />
          }
        />
      </Chart>

      <FlatList
        data={EXPENSES[month]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            data={item}
            selected={false}
            onPress={() => handleCardOnPress(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
