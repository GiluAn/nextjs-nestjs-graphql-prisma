import styled from 'styled-components';
import tw from 'twin.macro';

export const InputWrapper = styled.div`
  ${tw`mb-6`}
`;

export const Input = styled.input`
  ${tw`
  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
`;

export const Label = styled.label`
  ${tw`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
`;
