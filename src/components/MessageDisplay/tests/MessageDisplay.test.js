import { render } from '@testing-library/react';
import MessageDisplay from '../MessageDisplay';

describe('Message Display', () => {
  it('displays the received messages', () => {
    const mockMessage = [
      'mockMessage 1',
      'mockMessage 2',
      'mockMessage 3',
      'mockMessage 4',
    ];
    const { getByText } = render(<MessageDisplay messages={mockMessage} />);

    mockMessage.forEach((message) => {
      expect(getByText(message)).toBeInTheDocument();
    });
  });
});
