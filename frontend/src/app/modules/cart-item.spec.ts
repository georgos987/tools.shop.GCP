import { CartItem } from './cart-item';
import { Tool } from './tool';

describe('CartItem', () => {
  it('should create an instance', () => {
    expect(new CartItem(new Tool())).toBeTruthy();
  });
});
