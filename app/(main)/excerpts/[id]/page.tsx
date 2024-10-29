import { fetchExcerptById } from "@/app/lib/data";
import { Card, CardContent, Container, Typography } from "@mui/material";
import Markdown from 'react-markdown';

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const {
    author,
    work,
    body
  } = await fetchExcerptById(id);

  return (
		<Container maxWidth='md'>
			<Card sx={{
				p: 2,
				mx: 3,
				display: 'flex',
				justifyContent: 'center',
			}}>
				<CardContent>
					<Typography sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
						{author}
						<br />
						{work}
					</Typography>
					<Markdown>
						{body}
					</Markdown>
				</CardContent>
			</Card>
		</Container>
	);
}
