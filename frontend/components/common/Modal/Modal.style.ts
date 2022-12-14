import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';

export const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  ${tw`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center items-center flex`}
`;

export const ModalSection = styled.div`
  ${tw`relative w-full h-full max-w-2xl md:h-auto`}
`;

export const ModalContent = styled.div`
  ${tw`relative bg-white rounded-lg shadow dark:bg-gray-700`}
`;

export const ModalHeader = styled.div`
  ${tw`flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600`}
`;

export const ModalTitle = styled.h3`
  ${tw`text-xl font-semibold text-gray-900 dark:text-white`}
`;

export const ModalBody = styled.div`
  ${tw`p-6 space-y-6`}
`;
