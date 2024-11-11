'use client'

import {
  Card,
  CardContent,
  Grid2,
  LinearProgress,
  Typography
} from "@mui/material";
import type { Excerpt } from "@/lib/definitions";
import { ExcerptLink } from "@/app/ui/style";
import { Container } from "@mui/system";
import { useState } from "react";
import Markdown from "react-markdown";
import useInfiniteScroll, { CHUNK_SIZE } from "@/lib/useInfiniteScroll";

const List = ({
  excerpts
}: {
  excerpts: Excerpt[]
}) => {
	const [displayCount, setDisplayCount] = useState(CHUNK_SIZE);

	const loadMoreRef = useInfiniteScroll(setDisplayCount, excerpts);

	return (
		<>
			<Grid2 container sx={{ my: 10, justifyContent: 'center' }} rowSpacing={3}>
				{excerpts.slice(0, displayCount).map((excerpt) => {
					return (
						<Grid2 key={excerpt.id}>
							<Item excerpt={excerpt} />
						</Grid2>
					);
				})}
				{displayCount < excerpts.length && <LinearProgress ref={loadMoreRef} />}
			</Grid2>
		</>
	);
};

const Item: React.FC<{ excerpt: Excerpt }> = ({ excerpt }) => {
	return (
		<Container maxWidth='md'>
			<Card sx={{
				p: 2,
				mx: 3,
				display: 'flex',
				justifyContent: 'center',
			}}>
				<CardContent>
          <ExcerptLink href={`/excerpts/${excerpt.id}`}>
            <Typography sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
              {excerpt.author}
              <br />
              {excerpt.work}
            </Typography>
          </ExcerptLink>
					<Markdown>
						{excerpt.body}
					</Markdown>
				</CardContent>
			</Card>
		</Container>
	);
};

export default List;
