import type { Excerpt } from '@/app/lib/definitions';
import {
	Dialog,
	DialogContent,
	DialogActions,
  Typography,
} from '@mui/material';
import { CloseDialogTitle, DashboardFormButton } from '../style';

const DeleteDialog = ({
	excerpt,
	open,
	handleClose,
	handleConfirm
}: {
	excerpt: Excerpt
	open: boolean
	handleClose: () => void
	handleConfirm: () => void
}) => {
	return (
		<Dialog open={open} onClose={handleClose}>
			<CloseDialogTitle>
				{`${excerpt.id}: ${excerpt.author} - ${excerpt.work}`}
			</CloseDialogTitle>
			<DialogContent>
				<Typography>
					Are you sure you want to delete this excerpt?
				</Typography>
			</DialogContent>
			<DialogActions>
				<DashboardFormButton onClick={handleClose}>Cancel</DashboardFormButton>
				<DashboardFormButton onClick={handleConfirm}>Delete</DashboardFormButton>
			</DialogActions>
		</Dialog>
	);
}

export default DeleteDialog;
