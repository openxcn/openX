package bot.openx.android.ui

import androidx.compose.runtime.Composable
import bot.openx.android.MainViewModel
import bot.openx.android.ui.chat.ChatSheetContent

@Composable
fun ChatSheet(viewModel: MainViewModel) {
  ChatSheetContent(viewModel = viewModel)
}
