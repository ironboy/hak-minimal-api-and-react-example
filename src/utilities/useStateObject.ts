import { useState } from 'react';

export default function useStateObject<Type>(initialValue: Type) {

  const [value, setValue] = useState<Type>(initialValue);

  function setProperty(key: string, propertyValue: any) {
    setValue({ ...value, [key]: propertyValue });
  }

  return [value, setProperty] as const;
}