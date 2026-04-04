import { renderHook, act } from '@testing-library/react-native';
import { useStepper } from '../useStepper';

describe('useStepper', () => {
  const steps = [
    { id: '1', label: 'A' },
    { id: '2', label: 'B' },
  ];

  it('should navigate through steps', () => {
    const { result } = renderHook(() => useStepper({ initialStep: 0, steps }));
    expect(result.current.currentStep).toBe(0);

    act(() => {
      result.current.next();
    });
    expect(result.current.currentStep).toBe(1);
    expect(result.current.isLast).toBe(true);
  });
});
