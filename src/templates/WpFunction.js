import React from "react"
import { Box, Flex, Heading } from "@chakra-ui/core"
import Layout from "../components/Layout"
import Container from "../components/Container"
import { graphql } from "gatsby"
import PageTransition from "../components/PageTransition"
import { ParseHtml } from "../components/parse-html"
import TableOfContents from "../components/TableOfContents"
import Breadcrumb from "../components/breadcrumb/Breadcrumb"
import DeveloperReferenceSidebar from "../components/DeveloperReferenceSidebar"

const WpContentNode = ({ data }) => {
  const {
    wpContentNode: { title, content, uri },
  } = data

  const crumbs = [
    {
      title: `Developer Reference`,
      path: `/developer-reference/`,
    },
    {
      title: `Functions`,
      path: `/functions/`,
    },
    {
      title: title,
      path: uri,
      isCurrentPage: true,
    },
  ]

  return (
    <Layout>
      <Container>
        <Flex>
          <DeveloperReferenceSidebar />
          <Box style={{ flex: 1 }}>
            <Box pt={3} px={[0, 0, 10]} mt="0" mx="auto" minH="80vh">
              <PageTransition>
                <Flex>
                  <Box
                    className="content"
                    pt={3}
                    mt="0"
                    mx="auto"
                    maxWidth={[`20rem`, "30rem", "100%"]}
                    minH="80vh"
                  >
                    <Breadcrumb crumbs={crumbs} />
                    <Heading wordBreak="break-word" as="h1" fontSize={`4xl`}>
                      {title}
                    </Heading>
                    {ParseHtml(content)}
                  </Box>
                  <TableOfContents
                    content={content}
                    contentRef={ParseHtml(content)}
                  />
                </Flex>
              </PageTransition>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    wpContentNode(id: { eq: $id }) {
      __typename
      id
      uri
      ... on WpNodeWithTitle {
        title
      }
      ... on WpNodeWithContentEditor {
        content
      }
    }
  }
`

export default WpContentNode
