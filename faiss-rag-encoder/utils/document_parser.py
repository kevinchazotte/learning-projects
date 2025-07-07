import numpy as np

from . import morphological_helpers


# Empirically, this seems to work across a few different types of PDF files
# With more investigation, I would try turning this into a DP problem where up to some set percentage (maybe 15%) CAN be classified 
# as an "Introduction" section, thus allowing each page to bid for their slot and disincentivizing other pages.
def GetTableOfContentsEstimator(linksPerPage, pageCount, lookback=5):
    if pageCount <= lookback: return np.zeros(pageCount)
    # look for local maxima in sliding window over linksPerPage to identify candidates for 'table of contents' sections
    tableOfContentsEstimator = np.zeros(pageCount - lookback)
    averageLinks = np.mean(linksPerPage)
    for i in range(lookback, len(linksPerPage)):
        pastAverage = np.mean(linksPerPage[(i - lookback):i])
        current = linksPerPage[i]
        if current <= pastAverage:
            dropRatio = max((pastAverage - current), 1) / (pastAverage + 1e-6)
            magnitude = pastAverage / (pastAverage + averageLinks + 1e-6)
            frontBias = np.exp(-(5.0/pageCount) * (i - lookback)) # bias towards zero at the end of the array
            tableOfContentsEstimator[i - lookback] = dropRatio * magnitude * frontBias
        else:
            tableOfContentsEstimator[i - lookback] = 0.0
    binaryResult = np.where(tableOfContentsEstimator >= 0.5, 1, 0)
    # perform morphological closing with k=1
    binaryResult = morphological_helpers.dilate_array(morphological_helpers.erode_array(binaryResult, 1), 1)
    # return last position where binaryResult == 1, this is likely the final page of the introduction / table of contents
    for i in range(len(binaryResult) - 1, -1, -1):
        if binaryResult[i] == 1:
            return i + lookback

def GetDocumentMetadata(document):
    pageCount = document.page_count
    linksPerPage = []
    blocksPerPage = []
    linksToPage = {}
    # once-over to compute metadata before storing any paragraph info
    for pageIndex in range(pageCount):
        page = document.load_page(pageIndex)
        blocks = page.get_text("blocks")
        links = page.get_links()
        linksPerPage.append(len(links))
        blocksPerPage.append(len(blocks))
        for link in links:
            if not 'page' in link: continue
            linkTo = link['page']
            linksToPage[linkTo] = linksToPage.get(linkTo, 0) + 1
    
    # approximate which pages may be part of the introduction / table of contents
    lastTableOfContentsPage = GetTableOfContentsEstimator(linksPerPage, pageCount, 5) # underlying array looks something like [1,1,1,1,0,0,0,0,0,0,0,0,0,0]

    # estimate which pages are the most likely content pages based on internal links
    if len(linksToPage) != 0:
        startingContentPage = np.min(list(linksToPage.keys()))
        endingContentPage = np.max(list(linksToPage.keys()))
        likelyContentPages = np.zeros(pageCount, dtype=int)
        likelyContentPages[startingContentPage:endingContentPage] = 1
    else:
        likelyContentPages = np.ones(pageCount, dtype=int)

    return (lastTableOfContentsPage, likelyContentPages, np.mean(blocksPerPage))

def ExtractSentencesFromDocument(document, metadata):
    all_sentences = []
    lastTableOfContentsPage = metadata[0]
    likelyContentPages = metadata[1]
    averageBlocksPerPage = metadata[2]
    for pageIndex in range(document.page_count):
        page = document.load_page(pageIndex)
        blocks = page.get_text("blocks")
        if lastTableOfContentsPage and pageIndex < lastTableOfContentsPage:
            continue
        if not likelyContentPages[pageIndex]:
            if len(blocks) == 0 or len(blocks) < averageBlocksPerPage / 2:
                continue
        for block in blocks:
            paragraph_text = block[4].strip().replace("\n", " ")
            if paragraph_text.isnumeric() or len(paragraph_text) < 10: continue # hacky, but remove all very-short phrases as they're likely not substantial content
            all_sentences.append(paragraph_text)
    return all_sentences
