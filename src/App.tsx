import './App.css';
import { useState } from './zoey-hooks';

function App() {
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState({ name: 'apple', price: 1000 });

  const onNameEdit = (name: string) => {
    setProduct({
      ...product,
      name,
    });
  };

  const onChangePrice = (price: number) => {
    setProduct({
      ...product,
      price: product.price + price,
    });
  };

  return (
    <>
      <h1>useState</h1>
      <div className='card'>
        <button onClick={() => setCount(count + 1)}>count is {count}</button>
      </div>
      <div className='card'>
        <h3>현재 상품 {product.name}</h3>
        <h3>가격 {product.price}</h3>
      </div>
      <ProductPriceButtons onChangePrice={onChangePrice} />
      <ProductNameEditor onNameEdit={onNameEdit} />
    </>
  );
}

function ProductPriceButtons({
  onChangePrice,
}: {
  onChangePrice: (price: number) => void;
}) {
  const [increment, setIncrement] = useState(500);
  const [decrement, setDecrement] = useState(-500);

  const onChangeIncrement = (increment: number) => {
    setIncrement(increment);
  };

  const onChangeDecrement = (decrement: number) => {
    setDecrement(-1 * decrement);
  };

  return (
    <div className='card'>
      <button onClick={() => onChangePrice(increment)}>+{increment}</button>
      <button onClick={() => onChangePrice(decrement)}>{decrement}</button>
      <PriceAmountEditor
        initialAmount={increment}
        onChangeAmount={onChangeIncrement}
      />
      <PriceAmountEditor
        initialAmount={decrement}
        onChangeAmount={onChangeDecrement}
      />
    </div>
  );
}

function PriceAmountEditor({
  initialAmount,
  onChangeAmount,
}: {
  initialAmount: number;
  onChangeAmount: (amount: number) => void;
}) {
  const [amount, setAmount] = useState('');
  const isIncrement = initialAmount > 0;

  return (
    <div className='card'>
      <input value={amount} onChange={(e) => setAmount(e.target.value)}></input>
      <button
        onClick={() => {
          onChangeAmount(Number(amount));
          setAmount('');
        }}
      >
        {isIncrement ? '증가' : '감소'} 가격 변경
      </button>
    </div>
  );
}

function ProductNameEditor({
  onNameEdit,
}: {
  onNameEdit: (name: string) => void;
}) {
  const [input, setInput] = useState('');

  return (
    <div className='card'>
      <input value={input} onChange={(e) => setInput(e.target.value)}></input>
      <button
        onClick={() => {
          onNameEdit(input);
          setInput('');
        }}
      >
        상품명 저장
      </button>
    </div>
  );
}

export default App;
