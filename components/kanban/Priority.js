import PropTypes from "prop-types";
import styled from "styled-components";

const Levels = {
  low: {
    color: "linear-gradient(to right,#93aafb,#78b1f9)",
    text: "Low Priority",
  },
  medium: {
    color: "linear-gradient(to right,#7fd5bb,#80d5de)",
    text: "Medium Priority",
  },
  high: {
    color: "linear-gradient(to right,#d07cd4,#db77a2)",
    text: "High Priority",
  },
};

function getLevelData(level) {
  if (Levels[level] === undefined) {
    return { color: "black", text: "Unknown" };
  }
  return Levels[level];
}

const Container = styled.span`
  height: 20px;
  display: inline-flex;
  padding: 0px 10px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${(props) => getLevelData(props.level).color};
`;

const Text = styled.div`
  flex: 0;
  font-size: 13px;
  color: white;
  line-height: 1px;
`;

function Priority(props) {
  const { level } = props;

  return (
    <Container level={level}>
      <Text>{getLevelData(level).text}</Text>
    </Container>
  );
}

Priority.propTypes = {
  level: PropTypes.string.isRequired,
};

export default Priority;
