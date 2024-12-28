import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import { DynamicBanner } from 'pages/widgets/authoring';

describe('Dynamic Banner Widget Test Suite', () => {
  const user = userEvent.setup();
  const mockCancel = jest.fn();

  const TestComponent = () => {
    return <DynamicBanner onCancel={mockCancel} />;
  };

  // const mockOnClose = jest.fn();
  // const mockSetCurrentConfig = jest.fn();

  describe('Setup', () => {
    test('Dynamic Banner renders properly', async () => {
      render(<TestComponent />);

      const DynamicBanner = screen.getByTestId('dynamic-banner');

      expect(DynamicBanner).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    test('Configure Widget Button works properly', async () => {
      render(<TestComponent />);

      const ConfigureWidgetButton = screen.getByRole('button', {
        name: /Configure Widget/i,
      });

      expect(ConfigureWidgetButton).toBeInTheDocument();

      await act(async () => {
        await user.click(ConfigureWidgetButton);
      });

      const ConfigureWidgetCreativeName = screen.getByRole('textbox', {
        name: /Creative Name/i,
      });

      expect(ConfigureWidgetCreativeName).toBeInTheDocument();

      expect(
        screen.getByRole('textbox', {
          name: /Accessibility Label/i,
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole('textbox', {
          name: /Alt Text/i,
        }),
      ).toBeInTheDocument();
    });
  });
});
