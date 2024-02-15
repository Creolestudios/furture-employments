import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from '@react-pdf/renderer';
import { Colors } from '../../styles/variable';
import { adminCvDetailsStyles } from './CvDetails.styles';
import { hasChildElements } from '../../utils';

const CustomPdf = ({ htmlContent }: { htmlContent: any }) => {
  const styles = StyleSheet.create({
    heading: {
      color: `${Colors.LI_GREEN}`,
      fontWeight: 'bold',
      fontSize: '40px',
    },
  });

  const parsedElements = new DOMParser().parseFromString(
    htmlContent,
    'text/html',
  ).body.childNodes;
  const renderElement = (
    nodeName: string,
    content: any,
    isChildren: any,
  ): React.ReactNode[] | React.ReactNode | null => {
    const handleChildrenExist = (tagContent: any) => Array.from(tagContent).map((child: any) => {
      const isChildrenExist = hasChildElements(child);
      if (isChildrenExist) {
        return renderElement(
          child.nodeName,
          child.childNodes || '',
          isChildrenExist,
        );
      }

      return renderElement(
        child.nodeName,
        child.nodeName === 'IMG'
          ? child.getAttribute('src')
          : child.textContent || '',
        false,
      );
    });
    switch (nodeName) {
      case 'H1':
        return (
          <View style={adminCvDetailsStyles.heading}>
            <Text>{content}</Text>
          </View>
        );
      case 'H2':
        return (
          <View style={adminCvDetailsStyles.heading}>
            <Text>{content}</Text>
          </View>
        );
      case 'H3':
        return (
          <View style={adminCvDetailsStyles.heading}>
            <Text>{content}</Text>
          </View>
        );
      case 'H4':
        return (
          <View style={adminCvDetailsStyles.heading}>
            <Text>{content}</Text>
          </View>
        );
      case 'H5':
        return (
          <View style={adminCvDetailsStyles.heading}>
            <Text>{content}</Text>
          </View>
        );
      case 'H6':
        return (
          <View style={adminCvDetailsStyles.heading}>
            <Text>{content}</Text>
          </View>
        );
      case 'P':
        if (isChildren) {
          return handleChildrenExist(content);
        }
        return (
          <View style={adminCvDetailsStyles.paragraphText}>
            <Text>{content}</Text>
          </View>
        );

      case '#text':
        if (content === '\n') {
          return handleChildrenExist(content);
        }
        return (
          <View style={adminCvDetailsStyles.text}>
            <Text>{content}</Text>
          </View>
        );

      case 'UL':
        if (isChildren) {
          return handleChildrenExist(content);
        }
        return null;

      case 'LI':
        if (isChildren) {
          return handleChildrenExist(content);
        }
        return (
          <View style={adminCvDetailsStyles.list}>
            <Text style={adminCvDetailsStyles.bulletPoint}>•</Text>
            <Text style={adminCvDetailsStyles.listContent}>{content}</Text>
          </View>
        );

      case 'BLOCKQUOTE':
        if (isChildren) {
          return handleChildrenExist(content);
        }
        return (
          <View style={adminCvDetailsStyles.blockQuote}>
            <Text>{content}</Text>
          </View>
        );

      case 'IMG':
        return (
          <View>
            {content ? (
              <Image src={content} style={adminCvDetailsStyles.image} />
            ) : (
              <Text>No Image Show</Text>
            )}
          </View>
        );
      case 'PRE':
        if (isChildren) {
          return handleChildrenExist(content);
        }
        return (
          <View style={adminCvDetailsStyles.pre}>
            <Text>{content}</Text>
          </View>
        );

      case 'CODE':
        if (isChildren) {
          return handleChildrenExist(content);
        }
        return (
          <View style={adminCvDetailsStyles.code}>
            <Text>{content}</Text>
          </View>
        );
      case 'STRONG':
        if (isChildren) {
          return handleChildrenExist(content);
        }
        return (
          <View style={adminCvDetailsStyles.strong}>
            <Text>{content}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderedElements = Array.from(parsedElements).map((element: Node) => {
    if (element instanceof HTMLElement) {
      const hasChildren = hasChildElements(element);
      if (hasChildren) {
        return renderElement(
          element.nodeName,
          element.childNodes || '',
          hasChildren,
        );
      }
      return renderElement(element.nodeName, element.textContent || '', false);
    }
    return null;
  });

  // const renderedElements = Array.from(parsedElements).map((element: Node) => {
  //   if (element instanceof HTMLElement) {
  //     console.log(element.hasChildNodes(), typeof element.children);
  //     console.log(element.firstChild, element.childNodes.item);
  //     if (element.nodeName === 'UL') {
  //       return renderElement(element.nodeName, element || '');
  //     } else {
  //       return renderElement(element.nodeName, element.textContent || '');
  //     }
  //   }
  //   return null;
  // });

  return <View>{renderedElements}</View>;
};

export default CustomPdf;
