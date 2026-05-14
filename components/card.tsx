import { TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";

const ExpenseCard = ({
  title,
  total,
  onPress,
}: {
  title: string;
  total: number;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress}>
    <Card className="mb-5">
      <Card.Title title={title} />
      <Card.Content>
        <Text>Total: ₹ {total}</Text>
      </Card.Content>
    </Card>
  </TouchableOpacity>
);

export default ExpenseCard;
