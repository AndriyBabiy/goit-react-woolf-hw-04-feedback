import { FeedbackHeading } from 'components/FeedbackHeading/FeedbackHeading';
import { Container } from './App.styled';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { FeedbackStats } from 'components/FeedbackStats/FeedbackStats';
import { useEffect, useState } from 'react';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = option => {
    switch (option) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100);
  };

  useEffect(() => {
    countTotalFeedback();
    countPositiveFeedbackPercentage();
  });

  return (
    <Container>
      <FeedbackOptions
        text="Please leave feedback:"
        options={['good', 'bad', 'neutral']}
        onLeaveFeedback={handleClick}
      />
      {countTotalFeedback() > 0 ? (
        <FeedbackStats
          text="Statistics:"
          obj={{ good: good, bad: bad, neutral: neutral }}
          totalFeedback={countTotalFeedback}
          positivePercentage={countPositiveFeedbackPercentage}
        />
      ) : (
        <FeedbackHeading size={'large'} text={'There is no feedback'} />
      )}
    </Container>
  );
};

export default App;
