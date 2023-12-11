import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const AppPage = {
  vmw: async (value?: string) => {
    const input = await screen.findByTestId("vmw") as HTMLInputElement
    if (value) {
      fireEvent.change(input, {target: {value}})      
      return
    }
    return input.value;
  },

  avgo: async (value?: string) => {
    const input = await screen.findByTestId("avgo") as HTMLInputElement
    if (value) {
      fireEvent.change(input, {target: {value}})      
      return
    }
    return (await screen.findByTestId("avgo") as HTMLInputElement).value;
  },

  stock: async () => {
    return (await screen.findByTestId("stock") as HTMLLIElement).textContent;
  },

  cash: async () => {
    return (await screen.findByTestId("cash") as HTMLLIElement).textContent;
  },

  stockPeak: async () => {
    return (await screen.findByTestId("stock-peak") as HTMLLIElement).textContent;
  },

  allCash: async () => {
    return (await screen.findByTestId("all-cash") as HTMLLIElement).textContent;
  }
}

describe("App", () => {
  const page = AppPage;

  it('displays form prefilled with defaults', async () => {
    render(<App />);
    expect(await page.vmw()).toBe("100")
    expect(await page.avgo()).toBe("13")
  });

  it('stock values can be changed', async () => {
    render(<App />);
    await page.vmw("200")
    await page.avgo("20")
    expect(await page.stock()).toBe("39.68% of your VMW is AVGO now (at a conversion rate of 0.252 AVGO per VMW share).")
  });

  it('displays stock portion', async () => {
    render(<App />);
    expect(await page.stock()).toBe("51.59% of your VMW is AVGO now (at a conversion rate of 0.252 AVGO per VMW share).")
  });

  it('displays cash portion', async () => {
    render(<App />);
    expect(await page.cash()).toBe("48.41% of your VMW was converted to cash at a price of $142.00.")
  });

  it('displays other info', async () => {
    render(<App />);
    expect(await page.stockPeak()).toBe("Your VMW was worth $18,061.00 before conversion when it hit its peak of $180.61.")
    expect(await page.allCash()).toBe("Your VMW would be worth $14,200.00 if you got all cash at a price of $142.00.")
  });
})
