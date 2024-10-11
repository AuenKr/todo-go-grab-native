import DateTimePicker from "@react-native-community/datetimepicker";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleButton, StylePressable, StyleText } from "./style";
import { format } from "date-fns";

export const DatePickerBtn = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <SafeAreaView>
      <StylePressable
        onPress={() => setShow(true)}
        className="bg-gray-900 rounded-lg my-2"
      >
        <StyleText className="text-center text-white p-2">
          Select the Deadline
        </StyleText>
      </StylePressable>
      <StyleText className="text-center font-bold text-sm">
        Deadline: {format(date, "PPP")}
      </StyleText>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};
